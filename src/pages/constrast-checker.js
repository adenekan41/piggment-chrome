/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/* -------------------------- Internal Dependencies ------------------------- */

import SEO from 'components/seo';
import { calculateContrast, ratioStatus, isColor } from 'utils';

/* --------------------------- Image Dependencies --------------------------- */
import ArrowRight from '../assets/icons/icon-right.svg';

const ContrastChecker = () => {
	const [formstate, setState] = useState({
		background: '#fff5e0',
		text: '#0e0a38',
	});
	const [result, setResult] = useState('0.00');
	const [status] = useState({
		pass: 'rgb(16, 136, 15)',
		fail: 'rgb(177, 8, 8)',
		passBg: 'rgb(190, 255, 189)',
		failBg: 'rgb(255, 181, 180)',
	});

	const handleChange = (e, name) => {
		setState({
			...formstate,
			[name]: e.target.value,
		});
	};

	useEffect(() => {
		if (isColor(formstate.text) && isColor(formstate.background)) {
			setResult(
				calculateContrast(
					formstate.background || '#fff5e0',
					formstate.text || '#0e0a38'
				)
			);
		}
	}, [formstate]);

	return (
		<>
			<SEO
				title="Contrast Checker"
				description="Get the contrast ratio of text and colors for your app"
			/>
			<Section>
				<div className="container">
					<div className="row align-items-center justify-content-center">
						<div className="col-md-9">
							<article>
								<div className="row align-items-center">
									<div className="col-md-5 col-6">
										<label htmlFor="background">Background Color</label>
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<div
														style={{ background: formstate.background }}
														className="color-picker-wrapper"
													>
														<input
															type="color"
															value={formstate.background}
															onChange={(e) => handleChange(e, 'background')}
														/>
													</div>
												</span>
											</div>
											<input
												className="form-control"
												placeholder="#fff5e0"
												maxLength="7"
												type="text"
												value={formstate.background}
												onChange={(e) => handleChange(e, 'background')}
											/>
										</div>
									</div>
									<div className="col  d-none justify-content-center d-md-flex">
										<img src={ArrowRight} alt="Arrow Right" className="mt-4" />
									</div>
									<div className="col-md-5 col-6">
										<label htmlFor="input">Text Color</label>
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<div
														style={{ background: formstate.text }}
														className="color-picker-wrapper"
													>
														<input
															type="color"
															value={formstate.text}
															onChange={(e) => handleChange(e, 'text')}
														/>
													</div>
												</span>
											</div>
											<input
												className="form-control"
												placeholder="#0e0a38"
												type="text"
												maxLength="7"
												value={formstate.text}
												onChange={(e) => handleChange(e, 'text')}
											/>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
					<h4 className="header">Contrast.</h4>
					<div className="contrast__result">
						<div className="row">
							<div className="col-md-7">
								<div
									style={{ background: formstate.background || '#000' }}
									className="results__section"
								>
									<h2
										style={{ color: formstate.text || '#fff' }}
										contentEditable
									>
										Sed ut perspiciatis
									</h2>
									<p
										style={{ color: formstate.text || '#fff' }}
										contentEditable
									>
										Far far away, behind the word mountains, far from the
										countries Vokalia and Consonantia
									</p>
								</div>
							</div>
							<div className="col-md-5 d-flex justify-content-between flex-column">
								<article>
									<p>Contrast Ratio </p>
									<h2
										style={{
											color: ratioStatus((result && result.ratio) || '0.00')
												.color,
										}}
									>
										{(result && result.ratio) || '0.00'}
									</h2>
									<span
										style={{
											color: ratioStatus((result && result.ratio) || '0.00')
												.color,
											background: ratioStatus(
												(result && result.ratio) || '0.00'
											).background,
										}}
									>
										{ratioStatus((result && result.ratio) || '0.00').status}
									</span>
								</article>
								<div className="row">
									<div className="col-md-3 col-6">
										<div className="WCGA__status">
											<span
												style={{
													color:
														(result &&
															result.AA_level_large_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AA_level_large_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												{result && result.AA_level_large_text} ~ 4.5:1
											</span>
											<h4
												style={{
													color:
														(result &&
															result.AA_level_large_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AA_level_large_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												AA
											</h4>
											<p>Large Text</p>
										</div>
									</div>
									<div className="col-md-3 col-6">
										<div className="WCGA__status">
											<span
												style={{
													color:
														(result &&
															result.AA_level_small_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AA_level_small_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												{result && result.AA_level_small_text} ~ 3:1
											</span>
											<h4
												style={{
													color:
														(result &&
															result.AA_level_small_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AA_level_small_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												AA
											</h4>
											<p>Small Text</p>
										</div>
									</div>
									<div className="col-md-3 col-6">
										<div className="WCGA__status">
											<span
												style={{
													color:
														(result &&
															result.AAA_level_large_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AAA_level_large_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												{result && result.AAA_level_large_text} ~ 4.5:1
											</span>
											<h4
												style={{
													color:
														(result &&
															result.AAA_level_large_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AAA_level_large_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												AAA
											</h4>
											<p>Large Text</p>
										</div>
									</div>
									<div className="col-md-3 col-6">
										<div className="WCGA__status">
											<span
												style={{
													color:
														(result &&
															result.AAA_level_small_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AAA_level_small_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												{result && result.AAA_level_small_text} ~ 7:1
											</span>
											<h4
												style={{
													color:
														(result &&
															result.AAA_level_small_text === 'PASS' &&
															status.pass) ||
														status.fail,
													background:
														(result &&
															result.AAA_level_small_text === 'PASS' &&
															status.passBg) ||
														status.failBg,
												}}
											>
												AAA
											</h4>
											<p>Small Text</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="learn_more">
						<h4 className="header">How it works.</h4>
						<p>
							<b>AA</b>
							<br />
							The level AA requires a contrast ratio of at least 4.5:1 for
							normal text <br />
							The level AA requires a contrast ratio of at least 3:1 for large
							text (at least {'<18pt or >=14pt'} bold) or bold text. <br />
							<br />
							<b>AAA</b>
							<br />
							The level AAA requires a contrast ratio of at least 7:1 for normal
							text
							<br />
							The level AAA requires a contrast ratio of at least 4.5:1 for
							large text. (at least {'>=18pt'}) or larger.
						</p>
						<a
							href="https://en.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines#WCAG_2.0"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn More
						</a>
					</div>
				</div>
			</Section>
		</>
	);
};

const Section = styled.section`
	padding: 3rem 0;
	background: var(--bg-white);
	min-height: 100vh;
	margin-top: 3.8rem;
	h4.header {
		margin-top: 4rem;
		font-weight: 600;
		font-size: var(--font-x-md);
		color: var(--black);
		margin-bottom: 1.4rem;
		letter-spacing: -1.3px;
	}
	.learn_more {
		p {
			color: var(--black);
			font-size: var(--font-sm);
			line-height: 1.6;
		}
		a {
			color: var(--accent);
			font-weight: 600;
			border-bottom: 2px solid var(--accent);
			padding-bottom: 5px;
		}
	}
	.contrast__result {
		padding: 1rem;
		border-radius: 10px;
		background: var(--contrast-white);

		.results__section {
			background: rgb(0, 0, 0);
			height: 400px;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			text-align: center;
			padding: 0 4rem;
			border-radius: 10px;
		}
		article {
			margin-top: 2rem;
			h2 {
				color: var(--black);
				font-weight: 500;
				font-size: calc(var(--font-x-lg) + 1.8em);
				letter-spacing: -1.6px;
				text-align: center;
			}
			p {
				text-align: center;
				font-size: calc(var(--font-sm) - 1px);
				font-weight: 500;
				color: var(--black);
				margin-bottom: 0px;
			}
			span {
				border-radius: 50px;
				padding: 4px 13px;
				font-size: calc(var(--font-sm) - 1px);
				font-weight: 600;
				display: block;
				width: fit-content;
				margin: auto;
			}
		}
		.WCGA__status {
			h4 {
				padding: 15px 0;
				text-align: center;
				border-radius: 7px;
				font-weight: 600;
			}
			p {
				font-size: 13px;
				font-weight: 500;
				color: var(--black);
				text-align: center;
			}
			span {
				font-size: 10px;
				text-transform: lowercase;
				text-align: center;
				display: block;
				margin: auto;
				width: fit-content;
				padding: 3px 9px;
				border-radius: 50px;
				font-weight: 600;
				margin-bottom: 0.6rem;
				&::first-letter {
					text-transform: uppercase;
				}
			}
		}
	}
	label {
		font-size: calc(var(--font-sm) - 1px);
		color: #929292;
		font-weight: 400;
	}

	input.form-control {
		padding: 27px 21px;
		border: none;
		font-size: var(--font-sm);
		background: var(--contrast-white);
		color: var(--black);
		box-shadow: none !important;
		&::-webkit-input-placeholder {
			color: #b1b1b1;
		}
	}
	input[type='color'] {
		opacity: 0;
		display: block;
		width: 28px;
		height: 28px;
		border: none;
	}
	.color-picker-wrapper {
		background: rgb(0, 0, 0);
		height: 28px;
		border-radius: 6px;
		border: 1px solid var(--bg-white);
		width: 28px;
	}
	span.input-group-text {
		background: var(--contrast-white);
		border: none;
		padding-right: 0;
		svg {
			width: 20px;
		}
	}
	.pos-sticky {
		position: sticky;
		top: 56px;
		z-index: 99999999;
		padding: 8px 0;
		background: var(--bg-white);
	}
`;

export default ContrastChecker;
