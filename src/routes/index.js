/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

/* -------------------------- Internal Dependencies ------------------------- */
import ErrorBoundary from 'components/error-boundary';
import NavLayout from '../components/navbar';
import LogoPrimary from 'components/logo-primary';
import SkipToMain from 'components/a11y/skip-to-main';
import Home from '../pages';
import Explore from 'pages/explore';
import Palette from 'pages/palette';
/* ------------------------- Component Dependencies ------------------------- */
const NotFound = lazy(() => import('../pages/404'));
const GeneratePalette = lazy(() => import('../pages/generate-palette'));
const SavedColors = lazy(() => import('../pages/saved'));

const Generate = lazy(() => import('../pages/generate'));
const ContrastChecker = lazy(() => import('../pages/constrast-checker'));

/* ---------------------------- Routes PropTypes ---------------------------- */

const propTypes = {
	location: PropTypes.any,
};

const routes = ({ location }) => (
	<Wrapper>
		<ErrorBoundary>
			<SkipToMain content="main" />
			<NavLayout />
			<main id="main">
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						timeout={{ enter: 300, exit: 300 }}
						classNames="fade"
					>
						<Suspense fallback={<LogoPrimary />}>
							<Switch location={location}>
								<Route exact path="/" component={Home} />
								<Route path="/index.html" component={Home} />
								<Route path="/saved" component={SavedColors} />
								<Route path="/generate" component={Generate} />
								<Route path="/explore" component={Explore} />
								<Route path="/palette" component={Palette} />
								<Route path="/generate-palette" component={GeneratePalette} />
								<Route path="/contrast-checker" component={ContrastChecker} />
								<Route path="*" component={NotFound} />
							</Switch>
						</Suspense>
					</CSSTransition>
				</TransitionGroup>
			</main>
		</ErrorBoundary>
	</Wrapper>
);

const Wrapper = styled.div`
	.fade-enter {
		opacity: 0.6;
	}

	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 0.4s ease-in;
	}

	.fade-exit {
		opacity: 1;
	}

	.fade-exit.fade-exit-active {
		opacity: 0.6;
		transition: opacity 0.4s ease-in;
	}
`;

routes.propTypes = propTypes;

export default withRouter(routes);
