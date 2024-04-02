import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_ACTIVE_TAB,
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM,
    CLEAR_ITEMS
} from '../actions/ingredients';

const initialState = {
    bunItem: null,
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    addedItems: [],
    activeTab: 'bun',
}

export const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state, 
                itemsFailed: false, 
                itemsRequest: false, 
                items: action.items
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state, 
                itemsFailed: true, 
                itemsRequest: false
            };
        }
        case SET_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: action.tab
            }
        }
        case ADD_ITEM: {
            if(action.item.type === 'bun')
                return { ...state, bunItem: action.item}

            return {
                ...state,
                addedItems: [...state.addedItems, action.item]
            };
        }
        case DELETE_ITEM: {
            return {
                ...state,
                addedItems: state.addedItems.filter(item => item.uid !== action.item.index)
            }
        }
        case CLEAR_ITEMS: {
            return {
                ...state,
                addedItems: [],
                bunItem: null
            }
        }
        case MOVE_ITEM: {
            const ingredients = [...state.addedItems];
            ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0]);
            return {
                ...state,
                addedItems: ingredients
            }
        }
        default:
            return state;
    }
};