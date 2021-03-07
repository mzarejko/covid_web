export const url_listOpinion = (key) => {
    return 'comments/'+key
}


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
    return 'announcements/'+key1+'/products/'+key2
}


// basic path to backend
export const base_paths = {   
    BASE : 'https://covidwebbackend.herokuapp.com/',
    LOGIN : 'https://covidwebbackend.herokuapp.com/accounts/login/',
    REGISTER : 'https://covidwebbackend.herokuapp.com/accounts/register/',
    LOGOUT : 'https://covidwebbackend.herokuapp.com/accounts/logout/',
    MAIN_VIDEO : 'https://covidwebbackend.herokuapp.com/static/media/MainPage.png',
    REFRESH_TOKEN : 'https://covidwebbackend.herokuapp.com/accounts/refresh-token/',
    SET_NEEDY : 'members/activate-needy/',
    SET_VOLUNTEER : 'members/activate-vol/',
    UNSET_NEEDY : 'members/deactivate-needy/',
    UNSET_VOLUNTEER : 'members/deactivate-vol/',
    UPDATE_SCORE : 'members/vol-update/',
    COVID_DATA : 'covid/data/',
    SET_ANNOUNCEMENT : 'announcements/set/',
    LIST_MY_ANNONCEMENT : 'announcements/my/',
    LIST_ANNONCEMENT : 'announcements/',
    LIST_USERS : 'accounts/users/',
    ADMIN : 'accounts/admin/',
    COMMENTS : 'comments/set/',
}

