const loadData=()=>{
     $('#orders-table-body').empty();
    const firestore= firebase.firestore();
    firestore
    .collection('orders')
    .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();

            const row = ` 
            <tr>
                <td>${records.id}</td>
                <td>${data.customer.name}</td>
                <td>${data.orderDate}</td>
                <td>LKR ${data.totalCost}</td>
                <td>
                        <button class="btn btn-dark btn-sm" onclick="printData('${records.id}')">Print</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button>
                       
                </td>
            </tr> 
            `;
            $('#orders-table-body').append(row);

        })
    })
}

const printData=(id)=>{
    window.open(`order-details.html?id=${id}`)
}


const deleteData=(id)=>{
    if(confirm('Are you sure?')){
       const firestore = firebase.firestore();
       firestore
        .collection('orders')
        .doc(id)
        .delete()
        .then(()=>{
            toastr.success('Delete!', 'Success!')
            loadData()
           
        }) 
    }
}

