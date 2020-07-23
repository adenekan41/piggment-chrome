/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'codewonders-helpers';
import getRandomColors from 'codewonders-helpers/bundle-cjs/helpers/get-random-colors';

/* -------------------------- Internal Dependencies ------------------------- */

import {
	isColor,
	generatepalette,
	shouldBeLessThan,
	validateHexCode,
	guidGenerator,
} from 'utils';
import SEO from 'components/seo';
import GradientContext from 'context';
import GradientLayout from 'components/card/card-container';
import Card from 'components/card';
import AddToHomeScreen from 'components/a11y';
import { HeaderSlate } from 'pages';

const Gradientpalette = () => {
	const [formstate] = useState({
		start: validateHexCode(getRandomColors()) || '#fff5e0',
		end: validateHexCode(getRandomColors()) || '#0e0a38',
		count: 6,
	});
	const [result, setResult] = useState({});
	const [new_name] = useState(`#Palette${guidGenerator().slice(0, 4)}`);

	const { palette, loadpalettes } = useContext(GradientContext);

	const loadMore = useCallback(() => {
		loadpalettes(5);
	}, [loadpalettes]);

	useEffect(() => {
		if (palette.length === 0) {
			loadpalettes(6);
		}
	}, [loadpalettes, palette]);

	useEffect(() => {
		if (isColor(formstate.end) && isColor(formstate.start)) {
			setResult({
				...generatepalette(
					formstate.start || '#fff5e0',
					formstate.end || '#0e0a38',
					(formstate.count > 0 && shouldBeLessThan(formstate.count, 100)) || 6
				),
				name: new_name,
			});
		}
	}, [formstate.start, formstate.end, formstate.count, new_name]);

	return (
		<>
			<SEO
				title="Gradient palette"
				description="Get refreshing gradient palettes for your application"
			/>
			<AddToHomeScreen />
			<Header>
				<div className="container">
					<HeaderSlate />
				</div>
			</Header>
			<Section>
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-md-12 mb-4 margin-3">
							{!isEmpty(result) && (
								<Card palette cardMode="large" data={result} />
							)}
						</div>
					</div>
				</div>
				<div className="container">
					<br />
					<GradientLayout
						noRefresh
						header="Discover."
						state={palette}
						palette
					/>

					<button
						className="btn btn-piggment load__more"
						type="button"
						onClick={() => loadMore()}
					>
						Load More
					</button>
				</div>
			</Section>
		</>
	);
};

const Header = styled.header`
	background: var(--bg-white);
	min-height: 19em;
	align-items: center;
	justify-content: center;
	background-size: calc(20 * 0.5px) calc(20 * 0.5px);
	background-image: radial-gradient(
		var(--pattern-dot) 0.5px,
		transparent 0.5px
	);
	display: flex;

	p {
		color: #717171;
		margin: 0px 0;
		font-size: calc(var(--font-sm) + 1.1px);
		font-weight: 400;
	}
`;

export const Section = styled.section`
	padding: 1rem 0;
	background: var(--bg-white);
	min-height: 100vh;
	.margin-3 {
		margin-top: -3.5rem;
	}
	.load__more {
		margin: 4rem auto;
		display: block;
		padding: 12px 48px;
		border: navajowhite;
	}
	label {
		font-size: calc(var(--font-sm) - 1px);
		color: #929292;
		font-weight: 400;
	}

	.pos-sticky {
		position: sticky;
		top: 56px;
		z-index: 99999999;
		padding: 8px 0;
		background: #fff8f0;
	}
	.w-70 {
		width: 70px;
		height: 120px;
		margin: auto;
		display: block;
	}
`;

export default Gradientpalette;
