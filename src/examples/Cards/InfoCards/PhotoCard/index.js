import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import "./PhotoCard.css"; // Importe o arquivo de estilos

function PhotoCard({ src, alt, tipo, ...imgProps }) {
//  console.log(`192.168.0.9:3000/images/${src}`)
  return (
    <div className="photo-card"  >
      {tipo === 'envio' ? (<img  src={`http://192.168.1.8:3000/images/${src}`} alt={alt} {...imgProps} />):(
        <img src="https://www.placebrinquedos.com.br/lib/img/imagem-nao-disponivel.jpg" alt={alt} {...imgProps} />)}
    </div>
  );
}

PhotoCard.propTypes = {
  tipo: PropTypes.string.isRequired,
};

export default PhotoCard;
