export default function ({store, error }) {

    /*app.$axios.$get('checkAdmin')
        .then(response => {
            console.log(response);
            if(response !== 1){
                return error({statusCode: 404})
            }
        })
        .catch(() => {
            return error({statusCode: 404})
        });*/
    store.dispatch('auth/checkAdmin').then(response => {
        if(store.state.auth.isAdmin !== 1){
           return error({statusCode: 404})
           // return redirect('/404')
        }
    })
        .catch(() => {
          return error({statusCode: 404})
            //return redirect('/04')
        });
}
