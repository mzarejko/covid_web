
export const url_deleteAnnouncement = (key)=> {
    return 'announcements/'+key
}

export const url_listAssignedProducts = (key) => {
    return 'announcements/'+key+'/products/assigned/'
}

export const url_listUnassignedProducts = (key) => {
    return 'announcements/'+key+'/products/'
}

export const url_assignProducts = (key1, key2) => {
    return 'announcements/'+key1+'/products/'+key2+'/assign/'
}

export const url_setProducts = (key1) => {
    return 'announcements/'+key1+'/products/set/'
}

export const url_updateProducts = (key1, key2) => {
    return 'announcements/'+key1+'/products/'+key2+'/'
}


// basic path to backend
export const base_paths = {   
    BASE : 'http://0.0.0.0:8000/',
    LOGIN : 'http://0.0.0.0:8000/accounts/login/',
    REGISTER : 'http://0.0.0.0:8000/accounts/register/',
    LOGOUT : 'http://0.0.0.0:8000/accounts/logout/',
    MAIN_VIDEO : 'http://0.0.0.0:8000/media/MainPage.png/',
    REFRESH_TOKEN : 'http://0.0.0.0:8000/accounts/refresh-token/',
    SET_NEEDY : 'members/activate-needy/',
    SET_VOLUNTEER : 'members/activate-vol/',
    UNSET_NEEDY : 'members/deactivate-needy/',
    UNSET_VOLUNTEER : 'members/deactivate-vol/',
    UPDATE_SCORE : 'members/vol-update/',
    COVID_DATA : 'covid/data/',
    SET_ANNOUNCEMENT : 'announcements/set/',
    LIST_MY_ANNONCEMENT : 'announcements/my/',
    LIST_ANNONCEMENT : 'announcements/'
}

