const list = async (signal) => {
    try {
      let response = await fetch('/api/products/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const create = async (params ,credentials, product) => {
    try {
      let response = await fetch('/api/products/new/'+ params.userId, {
        method: 'POST',
        headers: {
          Accept: 'application/json',				
          Authorization: 'Bearer ' + credentials.t,
        },
        body: product,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  
  export {
    
    list,
    create
   
  }