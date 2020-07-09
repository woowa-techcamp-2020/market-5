window.addEventListener('beforeunload', deleteSessionID)

function deleteSessionID(){
    const url = 'http://localhost:8000/cookie';
    return fetch(url, {
        method : 'DELETE',
    })
}