

export async function fetchAllTape(setTapeList) {
    try {
        await fetch("http://localhost:3000/tape", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }

        }).then(response => response.json())
            .then(data => setTapeList(data));
    } catch (err) { console.log(err) }
}

export async function deleteTapeById(setTapeList,id) {
        try {
                await fetch("http://localhost:3000/tape/"+id, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }

                }).then(res => res.json).then(data => console.log(data));
            } catch (err) { 
                console.log(err) 
            }
}

export async function postCreateTape(setTapeList, tape) {
    return await fetch("http://localhost:3000/tape", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(tape)
    })
}