import { useStore } from '../store/store';
import { BsHeartFill, BsHeart, BsTrash } from 'react-icons/bs';
import './Favorites.css';

const Favorites = () => {
    const { favorites, removeFromFavorites } = useStore();

    const totalFavorites = favorites.length;

    return (
        <div className="fav-hover-container">
            {/* Favorites Icon (Trigger) */}
            <div className="fav-icon-wrapper">
                <BsHeartFill className="fav-icon" />
                {totalFavorites > 0 && <span className="fav-badge">{totalFavorites}</span>}
            </div>

            {/* Favorites Drawer */}
            <div className="fav-drawer">
                <div className="fav-header">
                    <h2>My Favorites</h2>
                    <span className="fav-count">{totalFavorites} {totalFavorites === 1 ? 'Item' : 'Items'}</span>
                </div>

                <div className="fav-items">
                    {favorites.length === 0 ? (
                        <div className="empty-fav">
                            <BsHeart size={48} color="#ccc" />
                            <p>No favorite items yet</p>
                        </div>
                    ) : (
                        favorites.map((item) => (
                            <div key={item.id} className="fav-item">
                                <img src={item.image} alt={item.name} className="fav-item-image" />
                                <div className="fav-item-details">
                                    <h4 className="fav-item-title">{item.name}</h4>
                                    <div className="fav-item-price">${(item.priceCents / 100).toFixed(2)}</div>
                                    <div className="fav-item-actions">
                                        <button className="remove-btn" onClick={() => removeFromFavorites(item.id)}>
                                            <BsTrash /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
