import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProductCard} from "../ProductCard/ProductCard";
import {fetchProducts} from "../../store/api/thunks";
import {selectProducts, selectProductStatus} from "../../store/products";
import {RequestStatus} from "@constants";

const SORT_CATEGORIES = [
    { id: "all", name: "Все категории" },
    { id: "phones", name: "Телефоны" },
    { id: "laptops", name: "Ноутбуки" },
    { id: "tablets", name: "Планшеты" }
];

const SORT_OPTIONS = [
    {id: ""}
]

export function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const dataStatus = useSelector(selectProductStatus);
    const isLoading = dataStatus === RequestStatus.Pending;

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortBy, setSortBy] = useState("name")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    }).sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "price") return a.price - b.price
        return 0
    })

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
    }

    if (isLoading) {
        return <div className="loading">Загрузка товаров...</div>
    }

    return (
        <div className="product-list">
            <div className="filters">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="filter-controls">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        {SORT_CATEGORIES.map(({id, name}) => (<option key={id} value={id}>{name}</option>))}
                    </select>

                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="name">По названию</option>
                        <option value="price">По цене</option>
                    </select>

                    <button onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
                    </button>
                </div>
            </div>

            <div className="products">
                {filteredProducts.map(product => (<ProductCard key={product.id} product={product} /> ))}
            </div>
        </div>
    )
}