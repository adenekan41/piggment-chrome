/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { memo, useEffect, useState, useCallback } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { setState, getState } from 'codewonders-helpers';
import { clearState } from 'codewonders-helpers/bundle-cjs/helpers/localstorage';
/* -------------------------- Internal Dependencies ------------------------- */
import PureComponent from 'components/pure-component-wrapper';

/* --------------------------- Image Dependencies --------------------------- */
import { ReactComponent as Light } from '../../assets/icons/icon-light.svg';
import { ReactComponent as Dark } from '../../assets/icons/icon-dark.svg';
import { ReactComponent as Grid } from '../../assets/icons/icon-grid.svg';
import Logo from '../../assets/icons/logo_.svg';

/* --------------------------- NavLayout PropTypes -------------------------- */
const propTypes = {
	location: PropTypes.object,
};

const NavLayout = memo(({ location }) => {
	const [theme, setTheme] = useState(!!getState('PIGGMENT'));

	const PureLight = PureComponent(Light);
	const PureDark = PureComponent(Dark);

	const loadTheme = useCallback(() => {
		if (theme === false) {
			clearState();
		} else {
			setState('PIGGMENT', 1);
		}
	}, [theme]);

	const setDark = () => {
		setTheme(!theme);
	};

	useEffect(() => {
		loadTheme();
	}, [loadTheme]);

	return (
		<>
			<BodyStyling theme={theme} />
			<NavWrapper
				collapseOnSelect
				expand="md"
				fixed="top"
				className={`${location.pathname.includes('generate') &&
					'spaced__out'} ${
					location.pathname === '/' || location.pathname === '/index.html'
						? 'pattern'
						: ''
				}`}
			>
				<div
					className={
						(location.pathname.includes('generate') && 'container-fluid ') ||
						'container-fluid px-5'
					}
				>
					<Navbar.Brand as={Link} to="/">
						<img src={Logo} alt="Piggment Logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar" />
					<Navbar.Collapse id="navbar">
						<Nav className="ml-auto">
							<NavDropdown title={<Grid className="grid" />} id="generate">
								<NavDropdown.Item href="https://piggment.co/explore">
									Explore
								</NavDropdown.Item>

								<NavDropdown.Item
									activeClassName="active"
									exact
									as={NavLink}
									to="/generate"
								>
									Generate Gradient
								</NavDropdown.Item>
								<NavDropdown.Item
									activeClassName="active"
									exact
									as={NavLink}
									to="/generate-palette"
								>
									Generate Palette
								</NavDropdown.Item>
								<NavDropdown.Item
									activeClassName="active"
									exact
									as={NavLink}
									to="/contrast-checker"
								>
									Contrast Checker
								</NavDropdown.Item>
								<NavDropdown.Item
									activeClassName="active"
									exact
									as={NavLink}
									to="/saved"
								>
									Saved
								</NavDropdown.Item>
								<NavDropdown.Item href="chrome://history">
									History
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link
								href="#"
								onClick={() => setDark()}
								className="theme"
								title="Set Theme"
							>
								{theme ? <PureLight /> : <PureDark />}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</div>
			</NavWrapper>
		</>
	);
});
const NavWrapper = styled(Navbar)`
	background: var(--bg-white);

	&.pattern {
		background-size: calc(20 * 0.5px) calc(20 * 0.5px);
		background-image: radial-gradient(
			var(--pattern-dot) 0.5px,
			transparent 0.5px
		);
	}
	&.spaced__out {
		width: calc(100% - 40px);
		left: 50%;
		border-radius: 8px;
		transform: translate(-50%, 10px);
		@media (max-width: 989px) {
			width: calc(100% - 10px);
		}
	}
	.avatar {
		background: #24348c;
		height: 30px;
		width: 30px;
		color: white;
		display: inline-flex;
		font-size: 13px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
	.theme {
		svg {
			fill: var(--black);
			opacity: 0.7;
		}
	}
	svg {
		height: 23px;
		width: auto;
		&.grid {
			height: 19px;
			fill: var(--black);

			opacity: 0.85;
			fill: var(--black);
		}
		@media (max-width: 990px) {
			height: 21px;
		}
	}
	.navbar-brand {
		img {
			width: auto;
			height: 28px;
			filter: contrast(var(--contrast));
			@media (max-width: 990px) {
				height: 24px !important;
			}
		}
	}
	.navbar-toggler {
		border: none !important;
		padding: 0;
	}
	.navbar-toggler-icon {
		display: inline-block;
		width: 1.2em;
		height: 1.2em;
	}
	.dropdown-menu {
		svg {
			width: 18px;
			fill: var(--accent);
		}
	}
	.nav-link {
		color: #717171;
		font-size: var(--font-sm);
		padding: 0.5rem 1rem !important;
		&.is-active {
			color: var(--black) !important;
			font-weight: 600;
		}
	}
`;

NavLayout.propTypes = propTypes;

const DarkTheme = css`
	:root {
		--theme-primary: #1b21dd;
		--white: #fafafa;
		--bg-white: #080a18;
		--black: #f2f2f2;
		--pattern-dot: #dcdfef26;
		--input-border: #505056;
		--triad-black: #1e0e33;
		--accent: #0e7cb0;
		--contrast: 0.5;
		--card: #0e1023;
		--alert-success: #438875;
		--alert-danger: #da3451;
		--sidebar-width: 260px;
		--gray: #8f9bb3;
	}
`;
const LightTheme = css`
	:root {
		--theme-primary: #1b21dd;
		--white: #fafafa;
		--bg-white: #fff8f0;
		--black: #0d1442;
		--input-border: #d8d8d8;
		--pattern-dot: #0a113e26;
		--accent: #152ba2;
		--contrast: 1;
		--card: #fff;
		--alert-success: #438875;
		--triad-black: #ffeae3;
		--alert-danger: #da3451;
		--sidebar-width: 260px;
		--gray: #8f9bb3;
	}
`;
export const BodyStyling = createGlobalStyle`
${(props) => (props.theme ? DarkTheme : LightTheme)}`;

export default withRouter(NavLayout);