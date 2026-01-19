import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "@store/api/thunks";
import {selectUser, selectUserError, selectUserStatus} from "@store/user";

import {RequestStatus} from "@constants";

import "./Header.css";

export const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);
    const isIdle = userStatus === RequestStatus.Idle;
    const isUserDataLoading = userStatus === RequestStatus.Pending;
    const isUserError = userStatus === RequestStatus.Rejected;

    useEffect(() => {
        if (isIdle) {
            dispatch(fetchUser());
        }
    }, [dispatch]);

    return (
        <header className="header">
            <h1>🛒 Интернет-магазин</h1>
            <div className="user-info">
                {isUserDataLoading && <span>Загрузка...</span>}
                {isUserError && <span>{userError}</span>}
                {user && <span>Привет, {user.name}!</span>}
            </div>
        </header>
    )
}