import {
    LIST_CATEGORIES,
    LIST_CATEGORIES_SUCCESS,
    LIST_CATEGORIES_FAILURE,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAILURE,
    SHOW_CATEGORY,
    SHOW_CATEGORY_SUCCESS,
    SHOW_CATEGORY_FAILURE,
    EDIT_CATEGORIES,
    EDIT_CATEGORIES_SUCCESS,
    EDIT_CATEGORIES_FAILURE,
    DELETE_CATEGORIES,
    DELETE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILURE,
    SET_CATEGORY_DEFAULTS,
    HANDLE_CATEGORY_TITLE,
    LIST_ALL_CATEGORIES
} from '../actionTypes/CategoryTypes'
import Category from '../../apis/Category'

function handleCategoryTitle (title) {

    return function (dispatch, getState) {
        dispatch({
            type: HANDLE_CATEGORY_TITLE,
            data: title
        })
    }
}

function listCategories (page = 1) {
    return function (dispatch, getState) {
        dispatch({
            type: LIST_CATEGORIES
        })

        Category.list(page).then(response => {
            dispatch({
                type: LIST_CATEGORIES_SUCCESS,
                data: response.data.data
            }).catch(error => {
                dispatch({
                    type: LIST_CATEGORIES_FAILURE,
                    error: error.response.data
                })
            })
        })
    }
}

function setCategoryDefaults () {
    return function (dispatch, getState) {
        dispatch({
            type: SET_CATEGORY_DEFAULTS
        })
    }
}

function addCategory (title, cb) {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_CATEGORIES
        })
alert(title);
        Category.add(title).then(response => {
            dispatch({
                type: CREATE_CATEGORIES_SUCCESS,
                data: response.data
            });
            cb();
        }).catch(error=>{
            dispatch({
                type:CREATE_CATEGORIES_FAILURE,
                data:error.response.data,
            })
        });
    }
}

export { listCategories, setCategoryDefaults, handleCategoryTitle,addCategory }
