/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

/* --------------------------- Internal Dependency -------------------------- */
import { initGA, logPageView } from '../../utils/analytics';

/* ----------------------------- SEO  PropTypes ----------------------------- */
const propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};

const SEO = ({ title, description }) => {
	const logPage = useCallback(() => {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}, []);

	useEffect(() => {
		logPage();
	}, [logPage]);

	return (
		<>
			<Helmet>
				<title>{title ? `${title} | Piggment` : 'New Tab'}</title>
				<meta
					name="description"
					content={
						description
							? `${description}  A curated collection of amazingly colored gradients for designers, developers and art makers over the world. now you can generate, explore, save, easy CSS crossbrowser gradient codes all in one place.`
							: 'The gradient you have always wanted. A curated collection of amazingly colored gradients for designers, developers and art makers over the world. now you can generate, explore, save, easy CSS crossbrowser gradient codes all in one place.'
					}
				/>
				<meta
					property="og:description"
					content={
						description
							? `${description} A curated collection of amazingly colored gradients for designers, developers and art makers over the world. now you can generate, explore, save, easy CSS crossbrowser gradient codes all in one place.`
							: 'The gradient you have always wanted. A curated collection of amazingly colored gradients for designers, developers and art makers over the world. now you can generate, explore, save, easy CSS crossbrowser gradient codes all in one place.'
					}
				/>
			</Helmet>
		</>
	);
};

SEO.propTypes = propTypes;

export default SEO;
