import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import "./PhotoCard.css"; // Importe o arquivo de estilos
const backendUrl = process.env.REACT_APP_BACKEND_URL;


function PhotoCard({ src, alt, tipo, ...imgProps }) {

  return (
    <div className="photo-card"  >
      {tipo === 'envio' ? (<img  src={`${backendUrl}/photos/images/${src}`} alt={alt} {...imgProps} />):(
        <img src="https://www.placebrinquedos.com.br/lib/img/imagem-nao-disponivel.jpg" alt={alt} {...imgProps} />)}
    </div>
  );
}

PhotoCard.propTypes = {
  tipo: PropTypes.string.isRequired,
};

export default PhotoCard;
