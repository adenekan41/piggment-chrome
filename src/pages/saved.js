/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getState } from 'codewonders-helpers/bundle-cjs/helpers/localstorage';
import { Link } from 'react-router-dom';
import { clearState } from 'codewonders-helpers';

/* -------------------------- Internal Dependencies ------------------------- */

import SEO from 'components/seo';
import AddToHomeScreen from 'components/a11y';
import PureComponent from 'components/pure-component-wrapper';
import GradientLayout from '../components/card/card-container';

/* --------------------------- Image Dependencies --------------------------- */

import { ReactComponent as Love } from '../assets/icons/icon-love.svg';

const SavedColors = () => {
	/* ------------------------------- PURE SVG's ------------------------------- */
	const PureLove = PureComponent(Love);
	/* ----------------------------------- END ---------------------------------- */

	const [state, setState] = useState([]);
	const [palette, setPalette] = useState([]);
	const [nav, setNav] = useState('gradients');

	useEffect(() => {
		setState(getState('SAVED_GRADIENTS'));
		setPalette(getState('SAVED_PALETTE'));

		if (getState('SAVED_GRADIENTS').length === 0) {
			clearState('SAVED_GRADIENTS');
		}
		if (getState('SAVED_PALETTE').length === 0) {
			clearState('SAVED_PALETTE');
		}
	}, []);

	return (
		<>
			<SEO title="Saved Gradients" />
			<AddToHomeScreen />

			<Section>
				<div className="container">
					<div className="d-flex  justify-content-center tab__nav">
						<button
							onClick={() => setNav('gradients')}
							className={`btn ${nav === 'gradients' && 'active'}`}
							type="button"
						>
							Gradients <span>{state.length || 0}</span>
						</button>
						<button
							onClick={() => setNav('palette')}
							className={`btn ${nav === 'palette' && 'active'}`}
							type="button"
						>
							Palettes <span>{palette.length || 0}</span>
						</button>
					</div>
					{nav === 'gradients' ? (
						<>
							<div className="fadeIn">
								<GradientLayout
									header={`Saved Gradients (${state.length || 0})`}
									mode="delete"
									state={state}
								/>
								{!getState('SAVED_GRADIENTS') && (
									<div className="text-center empty">
										<h3>You don't have any saved gradient yet</h3>
										<p>
											Click{' '}
											<PureLove className="small__svg" aria-hidden="true" /> to
											save a gradient
										</p>
										<Link className="btn btn-piggment mt-4" to="/explore">
											Explore Gradients
										</Link>
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<GradientLayout
								header={`Saved Palettes (${palette.length || 0})`}
								mode="delete"
								state={palette}
							/>
							{!getState('SAVED_PALETTE') && (
								<div className="text-center empty">
									<h3>You don't have any saved gradient palettes yet</h3>
									<p>
										Click <PureLove className="small__svg" aria-hidden="true" />{' '}
										to save a gradient palette
									</p>
									<Link className="btn btn-piggment mt-4" to="/palette">
										Explore Palettes
									</Link>
								</div>
							)}
						</>
					)}
				</div>
				<br />
				<br />
			</Section>
		</>
	);
};

const Section = styled.section`
	padding-top: 2rem;
	background: var(--bg-white);
	min-height: 100vh;
	margin-top: 3.8rem;
	.tab__nav {
		margin: 1.5rem 0;
		button {
			border: none;
			border-radius: 0px;
			margin: 0 5px;
			font-size: 15px;
			color: var(--black);
			background: transparent;
			padding: 11px 30px;
			span {
				background: #d0d0d0;
				padding: 2px 10px;
				border-radius: 50px;
				margin-left: 8px;
				font-size: 12px;
				color: var(--bg-white);
			}
			&.active {
				border-bottom: 3px solid var(--accent);
				color: var(--accent);
				span {
					background: var(--accent);
					color: #fff;
				}
			}
		}
	}
	.empty {
		margin-top: 2rem;
		h3 {
			font-weight: 600;
			font-size: var(--font-x-md);
			color: var(--black);
			margin-bottom: 1rem;
			letter-spacing: -1.3px;
		}
		p {
			color: #717171;
			margin: 0px 0;
			font-size: calc(var(--font-sm) + 1.1px);
			font-weight: 400;
		}
		svg {
			&.small__svg {
				width: calc(var(--font-sm) + 1.1px);
				fill: red;
			}
			&.large__svg {
				height: 250px;

				width: auto;

				margin-top: 2rem;
			}
		}
		a {
			padding: 11px 35px;
			font-size: calc(var(--font-sm) - 1px);
		}
	}
`;

export default SavedColors;
