const Config = {
    api: 'https://localhost:7172',
    headers: () => {
        return {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default Config;