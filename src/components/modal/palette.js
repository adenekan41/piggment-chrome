/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

/* -------------------------- Internal Dependencies ------------------------- */
import Card from '../card';
import GradientLayout from '../card/card-container';
import GradientContext from '../../context';

/* ---------------------------- Style Dependency ---------------------------- */
import ModalWrapper from './style';

/* --------------------------- Image Dependencies --------------------------- */
import { ReactComponent as Close } from '../../assets/icons/icon-close.svg';
import ArrowRight from '../../assets/icons/icon-right.svg';

/* ------------------------- ModalPalette PropTypes ------------------------- */
const propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
	data: PropTypes.object,
};

const ModalPalette = ({ show, setShow, data }) => {
	const { palette, loadpalettes } = useContext(GradientContext);

	useEffect(() => {
		if (palette.length < 6) {
			loadpalettes(6);
		}
	}, [loadpalettes, palette, show]);

	return (
		<ModalWrapper
			show={show}
			onHide={setShow}
			aria-labelledby={data.name}
			size="lg"
			onEscapeKeyDown={setShow}
		>
			<button
				className="none-button"
				onClick={() => setShow(false)}
				type="button"
			>
				<Close className="d-block ml-auto mb-5 close_modal" />
			</button>
			<h4 className="mb-4 header__modal">About Palette.</h4>
			<div id="wite_up">
				<Card palette cardMode="large" data={data} />
			</div>
			<div className="headers">
				<h2>{data.name}</h2>
				<div className="hexes__sections d-flex align-items-center">
					<div className="d-flex align-items-center">
						{' '}
						<p className="d-block">{data.start}</p>{' '}
						<span style={{ background: data.start }} className="mr-4" />{' '}
					</div>
					<img src={ArrowRight} alt="Arrow Right" />
					<div className="d-flex align-items-center">
						<span style={{ background: data.end }} className="ml-4 mr-2" />{' '}
						<p className="d-block">{data.end}</p>{' '}
					</div>
				</div>{' '}
				<a
					className="btn btn-outline-piggment mt-4"
					href={`https://piggment.co/palette/${data.start.slice(
						1
					)}/${data.end.slice(1)}/${data.name.slice(1)}/${data.count}`}
				>
					Edit Palette
				</a>
				<br />
			</div>

			<GradientLayout header="More Like This" state={palette} palette />
		</ModalWrapper>
	);
};

ModalPalette.propTypes = propTypes;

export default ModalPalette;
