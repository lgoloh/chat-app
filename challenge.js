myFunction() {
    GetMessages((list) => {
        console.log(list);
    })
}

async function myFunction() {
    const list = await GetMessages();
    console.log(list);
}

SecFunction() {
    request((result, err) => console.log(result, err))
}

async function SecFunction() {
    try {
       result = await request();
       console.log(result)
    } catch(error) {
        console.log(error)
    }
}
