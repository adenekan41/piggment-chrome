/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useCallback, useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import randomWords from 'random-words';
import isEmpty from 'codewonders-helpers/bundle-cjs/helpers/is-empty';
import getRandomColors from 'codewonders-helpers/bundle-cjs/helpers/get-random-colors';

/* -------------------------- Internal Dependencies ------------------------- */

import {
	isColor,
	hexToRgb,
	guidGenerator,
	validateHexCode,
	shouldBeLessThan,
} from 'utils';
import { HeaderSlate } from 'pages';
import SEO from 'components/seo';
import Card from 'components/card';
import AddToHomeScreen from 'components/a11y';
import GradientLayout from '../components/card/card-container';
import GradientContext from '../context';

const Explore = () => {
	const { state, loadGradients } = useContext(GradientContext);
	const [result, setResult] = useState({});
	const [name] = useState(randomWords({ exactly: 2, join: ' ' }));
	const [ID] = useState(guidGenerator());

	const [$color$] = useState(
		'linear-gradient(58deg, rgb(182, 108, 208) 21%, rgb(12, 30, 39) 100%)'
	);

	const [formstate] = useState({
		from: validateHexCode(getRandomColors()) || '#a9c3d0',
		to: validateHexCode(getRandomColors()) || '#f0c7ff',
		fromPercent:
			$color$
				.substring($color$.indexOf('rgb'), $color$.indexOf('%'))
				.match(/\d+/g)
				.pop() || 20,
		toPercent: $color$.match(/\d+/g).pop() || 100,
		angle: Math.floor(Math.random() * (100 - 58 + 1)) + 58,
	});

	const loadMore = useCallback(() => {
		loadGradients(5);
	}, [loadGradients]);

	useEffect(() => {
		if (state.length === 0) {
			loadGradients(10);
		}
	}, [loadGradients, state]);

	useEffect(() => {
		if (isColor(formstate.from) && isColor(formstate.to)) {
			const newColor = `linear-gradient(${shouldBeLessThan(
				formstate.angle,
				360
			)}deg, ${hexToRgb(formstate.from, true)} ${shouldBeLessThan(
				formstate.fromPercent
			) || 20}%, ${hexToRgb(formstate.to, true)} ${shouldBeLessThan(
				formstate.toPercent
			) || 100}%)`;

			// Final Result
			setResult({
				id: ID,
				color: newColor,
				name,
			});
		}
	}, [ID, formstate, name, $color$]);

	return (
		<main>
			<SEO
				title="Explore"
				description="Explore fresh gradients. Find new gradients Inspiring Gradients"
			/>
			<AddToHomeScreen />
			<Header>
				<div className="container">
					<HeaderSlate />
				</div>
			</Header>
			<Section>
				<div className="container">
					<div className="card__wrapper">
						{!isEmpty(result) && <Card type="large" data={result} />}
					</div>
					<br />
					<GradientLayout noRefresh header="Discover." state={state} />

					<button
						className="btn btn-piggment load__more"
						type="button"
						onClick={() => loadMore()}
					>
						Load More
					</button>
				</div>
			</Section>
		</main>
	);
};

const Header = styled.header`
	background: var(--bg-white);
	min-height: 20em;
	align-items: center;
	justify-content: center;
	background-size: calc(20 * 0.5px) calc(20 * 0.5px);
	background-image: radial-gradient(
		var(--pattern-dot) 0.5px,
		transparent 0.5px
	);
	display: flex;
	/* h1 {
		font-weight: 900;
		font-size: var(--font-lg);
		text-align: center;
		color: var(--black);
		letter-spacing: -1.3px;
	} */
	label {
		font-size: calc(var(--font-sm) - 1px);
		color: #929292;
		font-weight: 400;
	}

	/* input.form-control {
		padding: 27px 21px;
		border: none;
		font-size: var(--font-sm);
		box-shadow: none !important;
		&::-webkit-input-placeholder {
			color: #b1b1b1;
		}
	} */
	input[type='color'] {
		opacity: 0;
		display: block;
		width: 28px;
		height: 28px;
		border: none;
	}
	.percentage__input {
		padding: 0 10px 0 0 !important;
		color: #ddd;
		input {
			width: 40px;
			padding: 3px 0 3px 0;
			border: none;
			text-align: right;
			color: #575e64;
			outline: none !important;
			@media (max-width: 787px) {
				width: 21px;
			}
		}
	}
	.color-picker-wrapper {
		background: rgb(0, 0, 0);
		height: 28px;
		border-radius: 6px;
		border: 1px solid #fff8f0;
		width: 28px;
	}
`;

const Section = styled.section`
	padding-top: 5rem;
	background: var(--bg-white);
	.w-70 {
		width: 70px;
		height: 120px;
		margin: auto;
		display: block;
	}
	.card__wrapper {
		margin: -10rem 0px 2rem;
	}
	.load__more {
		margin: 4rem auto;
		display: block;
		padding: 12px 48px;
		border: navajowhite;
	}
`;

export default Explore;
