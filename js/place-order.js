const loadCustomerIds=()=>{
    $('#customer-id').emty;
}

const firestore = firebase.firestore();
firestore
    .collection('customers')
    .get()
    .then((recodes =>{
        recodes.forEach((result)=>{
            const option = $('<option></optiion>').val(result.id).text(result.id)
            $('#customer-id').append(option)
        })
    }))