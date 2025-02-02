import { useParams } from 'react-router-dom';
import { useBag } from '../context/BagContext';  // Não altere isso
import products from '../data/products';
import Header from '../components/Header';
import s from './ProductDetails.module.css';

function ProductDetails() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const { addItemToBag } = useBag();  // Corrija para o nome correto

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToBag = () => {
        addItemToBag(product);  // Chame a função correta
    };

    return (
        <div className={s.productDetails}>
            <Header />
            <main>
                <div className={s.productContainer}>
                    <img
                        src={product.imgSrc}
                        alt={product.name}
                        className={s.productImage}
                    />
                    <div className={s.productInfo}>
                        <h1 className={s.productName}>{product.name}</h1>
                        <p className={s.productPrice}>{product.price}</p>
                        <p className={s.productRating}>Rating: {product.rating}</p>
                        <p className={s.productTime}>Estimated Time: {product.time}</p>
                        <p className={s.productType}>Type: {product.type}</p>
                        <button className={s.addButton} onClick={handleAddToBag}>
                            Add to Bag
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductDetails;
