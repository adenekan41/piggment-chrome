/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useContext, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

/* -------------------------- Internal Dependencies ------------------------- */

import GradientContext from 'context';
import SEO from 'components/seo';
import Card from '../components/card';

const Generate = () => {
	const { palette, loadpalettes } = useContext(GradientContext);

	const [index, setIndex] = useState(0);

	const handleSpaceBar = useCallback(
		async (e) => {
			if (e.keyCode === 32) {
				e.preventDefault();

				await loadpalettes(1);
				setIndex(index + 1);
			} else if (e.keyCode === 39) {
				e.preventDefault();

				await loadpalettes(1);
				setIndex(index + 1);
			} else if (e.keyCode === 37) {
				e.preventDefault();

				if (index > 0) {
					setIndex(index - 1);
				}
			}
		},
		[index, loadpalettes]
	);

	useEffect(() => {
		if (palette.length < 1) {
			loadpalettes(1);
		}
	}, [loadpalettes, palette]);

	useEffect(
		function setupListener() {
			window.addEventListener('keydown', handleSpaceBar);

			return function cleanupListener() {
				window.removeEventListener('keydown', handleSpaceBar);
			};
		},
		[handleSpaceBar]
	);

	return (
		<>
			<SEO title="Generate Gradients" />
			<GenerateWrapper>
				{palette.length > 0 && (
					<Card
						data={palette && palette[index]}
						type="generate"
						next={async () => {
							await loadpalettes(1);
							setIndex(index + 1);
						}}
						palette
						prev={() => index > 0 && setIndex(index - 1)}
					/>
				)}
			</GenerateWrapper>
		</>
	);
};

const GenerateWrapper = styled.main`
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		padding: 14px 25px;
		background: var(--bg-white);
		align-items: center;
		svg {
			height: 20px;
			width: auto;
		}
		h3 {
			font-weight: 900;
			font-size: 1.42em;
			color: var(--black);
			margin: 0;
			letter-spacing: -1.3px;
		}
		.buttons {
			a {
				font-size: calc(var(--font-sm) - 1px);
				color: var(--accent);
			}
		}
	}
	height: 100vh;
	width: 100vw;
`;
export default Generate;
