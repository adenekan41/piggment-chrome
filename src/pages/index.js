/*global chrome*/
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { arrayPickOne } from 'codewonders-helpers';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

/* -------------------------- Internal Dependencies ------------------------- */

import SEO from 'components/seo';
import GradientContext from '../context';
import Card from '../components/card';
import PureComponent from 'components/pure-component-wrapper';

/* --------------------------- Image Dependency --------------------------- */
import { ReactComponent as Search } from '../assets/icons/icon-search.svg';
import { ReactComponent as Google } from '../assets/icons/icon-google.svg';
import { ReactComponent as Duck } from '../assets/icons/icon-duck.svg';
import { ReactComponent as Bing } from '../assets/icons/icon-bing.svg';
import { ReactComponent as Yandex } from '../assets/icons/icon-yandex.svg';

const Home = () => {
	const { state, palette, loadGradients, loadpalettes } = useContext(
		GradientContext
	);

	const PureGoogle = PureComponent(Google);
	const PureDuck = PureComponent(Duck);
	const PureBing = PureComponent(Bing);
	const PureYandex = PureComponent(Yandex);

	const [home_state, setHomeState] = useState([]);
	const [topSites, setTopSite] = useState([]);
	const [time, setTime] = useState(moment().format('LTS'));
	const [input, setInput] = useState({
		value: '',
		search: 'https://Google.com/search?q=',
	});

	const searchGoogle = () => {
		setInput({ ...input, value: '' });
		window.location.href = input.search + encodeURIComponent(input.value);
	};

	const startTime = () => {
		setTime(moment().format('LTS'));
	};

	useEffect(() => {
		if (state.length < 3 || palette.length < 3) {
			loadGradients(3);
			loadpalettes(3);
		}
		if (chrome.topSites) {
			chrome.topSites.get((topSite) => setTopSite(topSite));
		}

		setHomeState(
			arrayPickOne([
				{
					first: {
						...palette[1],
						gradient: false,
						palette: true,
					},
					second: {
						...palette[0],
						gradient: false,
						palette: true,
					},
					third: {
						...state[1],
						gradient: true,
						palette: false,
					},
				},
				{
					first: {
						...state[0],
						gradient: true,
						palette: false,
					},
					second: {
						...state[1],
						gradient: true,
						palette: false,
					},
					third: {
						...palette[1],
						gradient: false,
						palette: true,
					},
				},
				{
					first: {
						...palette[0],
						gradient: false,
						palette: true,
					},
					second: {
						...state[1],
						gradient: true,
						palette: false,
					},
					third: {
						...palette[1],
						gradient: false,
						palette: true,
					},
				},
				{
					first: {
						...state[0],
						gradient: true,
						palette: false,
					},
					second: {
						...palette[1],
						gradient: false,
						palette: true,
					},
					third: {
						...state[1],
						gradient: true,
						palette: false,
					},
				},
			])
		);
	}, [loadGradients, state, palette, loadpalettes]);

	useEffect(() => {
		setInterval(() => startTime(), 1000);

		return () => {
			clearInterval(startTime);
		};
	}, []);

	return (
		<>
			<SEO />
			<main>
				<Header className="fadeIn">
					<div className="container">
						<div className="row justify-content-center align-items-center text-left fadeInUp">
							<div className="col-md-3">
								<h4 className="text-center text-md-left">
									{time.includes('AM')
										? 'Hey There!, Good Morning'
										: time.split(':')[0] >= 12 ||
										  (time.split(':')[0] <= 4 && time.includes('PM'))
										? 'Welcome Back!, Great Noon'
										: 'Hello There!, Good Evening'}
								</h4>
								<h1>{time}</h1>
							</div>
							<div className="col-md-9">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text" id="search">
											<Dropdown>
												<Dropdown.Toggle as={Search}></Dropdown.Toggle>

												<Dropdown.Menu>
													<Dropdown.Item
														onClick={() =>
															setInput({
																...input,
																search: 'https://Google.com/search?q=',
															})
														}
													>
														<PureGoogle /> Search with Google
													</Dropdown.Item>
													<Dropdown.Item
														onClick={() =>
															setInput({
																...input,
																search: 'https://Duckduckgo.com/?q=',
															})
														}
													>
														<PureDuck /> Search with Duckduckgo
													</Dropdown.Item>
													<Dropdown.Item
														onClick={() =>
															setInput({
																...input,
																search: 'https://Bing.com/search?q=',
															})
														}
													>
														<PureBing /> Search with Bing
													</Dropdown.Item>
													<Dropdown.Item
														onClick={() =>
															setInput({
																...input,
																search: 'https://Yandex.com/search/?text=',
															})
														}
													>
														<PureYandex /> Search with Yandex
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder={
											'Search ' + input.search.split('/')[2].replace('.com', '')
										}
										aria-label="Search"
										onChange={(e) =>
											setInput({ ...input, value: e.target.value })
										}
										onKeyPress={(e) => {
											const key = e.keyCode || e.which;
											if (key === 13) {
												e.preventDefault();
												searchGoogle();
											}
										}}
										aria-describedby="search"
									/>
								</div>
							</div>
						</div>
						<div className="col-md-8 m-auto fadeInUp ani-delay-2 fadeInFill">
							<div className="d-flex justify-content-center mt-3 mb-4">
								{topSites.length > 0 &&
									topSites.map((site) => (
										<OverlayTrigger
											overlay={
												<Tooltip id="tooltip-disabled">{site.title}</Tooltip>
											}
											placement={'bottom'}
										>
											<div className="top_site">
												<a
													href={site.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<img
														src={'chrome://favicon/' + site.url}
														alt={site.title}
													/>
												</a>
											</div>
										</OverlayTrigger>
									))}
							</div>
						</div>
						{home_state?.first?.id &&
						home_state?.second?.id &&
						home_state?.third?.id ? (
							<div className="row fadeInUp">
								<div className="col-md-8 mb-3 mb-md-0">
									<Card
										data={home_state?.first}
										palette={home_state?.first?.palette}
										type={home_state?.first?.gradient && 'large'}
										cardMode={home_state?.first?.palette && 'large'}
									/>
								</div>
								<div className="col-md-4">
									<div className="page__card">
										<Card
											data={home_state?.second}
											palette={home_state?.second?.palette}
											type={home_state?.second?.gradient && 'large'}
											noDescription
											cardMode={home_state?.second?.palette && 'large'}
										/>
									</div>
									<div className="page__card">
										<Card
											data={home_state?.third}
											palette={home_state?.third?.palette}
											type={home_state?.third?.gradient && 'large'}
											noDescription
											cardMode={home_state?.third?.palette && 'large'}
										/>
									</div>
								</div>
							</div>
						) : null}
						<div className="bottom_bar d-block d-md-flex fadeInUp fadeInFill">
							<a href="https://piggment.co/explore">Explore Gradients</a>
							<a href="https://piggment.co/palette">Discover Palettes</a>
							<a href="https://piggment.co/about">About</a>
							<a href="https://piggment.co/privacy">Privacy & Policy</a>
						</div>
					</div>
				</Header>
			</main>
		</>
	);
};

const Header = styled.header`
	background: var(--bg-white);

	min-height: calc(100vh - 62px);
	margin-top: 3.88rem;

	align-items: center;
	background-size: calc(20 * 0.5px) calc(20 * 0.5px);
	background-image: radial-gradient(
		var(--pattern-dot) 0.5px,
		transparent 0.5px
	);
	justify-content: center;
	text-align: center;
	display: flex;

	h1 {
		font-weight: 500;
		font-size: calc(var(--font-lg) - 6px);
		color: var(--black);
		-webkit-letter-spacing: -1.3px;
		-moz-letter-spacing: -1.3px;
		-ms-letter-spacing: -1.3px;
		letter-spacing: -1.3px;
		margin: 0;
	}
	h4 {
		font-size: 15px;
		margin-bottom: 9px;
		color: var(--black);
		opacity: 0.7;
		font-weight: 100;
	}
	p {
		color: #717171;
		margin: 6px 0;
		font-size: calc(var(--font-sm) + 1.1px);
		font-weight: 400;
	}
	a.btn {
		padding: 12px 40px;
		border: none;
		font-size: var(--font-sm);
		font-weight: 500;
		margin-top: 2rem;
		@media (max-width: 990px) {
			font-size: calc(var(--font-sm) - 1px);
		}
	}
	.ani-delay-2 {
		animation-delay: 0.4s;
	}

	.bottom_bar {
		margin: 3.5rem auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		animation-delay: 0.7s;

		a {
			background: var(--triad-black);
			padding: 12px 26px;
			margin: 0;
			font-size: 13px;
			border-radius: 1px;
			/* border: 1px solid #ffbc71; */
			display: block;
			width: fit-content;
			color: var(--black);
			border-right: 0.5px solid var(--pattern-dot);
			opacity: 0.75;
			@media (max-width: 787px) {
				border-radius: 1px !important;

				width: 100%;
			}
			&:last-child {
				border-radius: 0px 50px 50px 0px;
				border-right: none !important;
			}
			&:first-child {
				border-radius: 50px 0px 0px 50px;
			}
			&:hover {
				background: var(--black) !important;
				color: var(--bg-white) !important;
				text-decoration: none;
				transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
			}
		}
	}
	.page__card {
		font-size: 0.86rem;
		height: 50%;
		&:first-child {
			margin-bottom: 11px;
		}
		.write__up {
			height: 53px;
		}
		.large__sum-card,
		.card {
			height: 184.5px;
		}
		.bordered {
			min-height: auto;
			height: 100%;
			figure {
				min-height: auto;
				height: 100%;
			}
		}
	}
	.bordered {
		min-height: 24.5em;
	}
	.card {
		background: var(--card) !important;
	}
	.large__sum-card,
	.card {
		height: 24.5em;
	}
	.top_site img {
		border-radius: 5px;
		object-fit: contain;
		background: var(--triad-black);
		padding: 2px;
		height: 26px;
		width: 26px;
		border: 1px solid var(--input-border);
	}
	.top_site {
		margin-right: 1rem;
	}
	.input-group-text {
		background: transparent;
		border: none;

		border-bottom: 0px solid var(--input-border);
		border-radius: 1px;
		padding: 0;

		svg {
			width: 23px;
			cursor: pointer;
			fill: var(--black);
			padding-right: 6px;
		}
	}
	input {
		padding: 24px 5px;
		border: none;
		font-size: 15px;
		background: transparent;
		border-bottom: 1px solid var(--input-border);
		border-radius: 1px;
		color: var(--black) !important;
		&:focus {
			background: transparent;
			border-bottom: 1px solid var(--black);
			box-shadow: none;
		}
	}
`;

export default Home;
