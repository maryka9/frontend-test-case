import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../store/api/thunks";
import {selectUser} from "../../store/user";

export function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <header className="header">
            <h1>🛒 Интернет-магазин</h1>
            <div className="user-info">
                {user ? (
                    <span>Привет, {user.name}!</span>
                ) : (
                    <span>Загрузка...</span>
                )}
            </div>
        </header>
    )
}