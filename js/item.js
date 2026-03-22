const createItems=()=>{
    const tempItem = {
        description: $('#description').val(),
        qtyOnHand: $('#qtyOnHand').val(),
        unitPrice: $('#unitPrice').val(), 
    };
    

    console.log(tempItem);
    const database = firebase.firestore();
    database
    .collection('items')
    .add(tempItem)
    .then((response)=>{
        console.log(response);
        loadItems()
    }).catch((error)=>{
        console.log(error);  
    })
}

const loadItems=()=>{
    $('#table-body').empty();
    const firestore= firebase.firestore();
    firestore
    .collection('items')
    .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();

            const row = ` 
            <tr>
                <td>${records.id}</td>
                <td>${data.description}</td>
                <td>${data.qtyOnHand}</td>
                <td>LKR ${data.unitPrice}</td>
                <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button> |
                        <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button>
                </td>
            </tr> 
            `;
            $('#table-body').append(row);

        })
    })
}


itemId=undefined
const updateData=(id)=>{
    itemId=id;
    const firestore = firebase.firestore();
    firestore
    .collection('items')
    .doc(itemId)
    .get().then((response)=>{
        if(response.exists){
            const data = response.data();
             $('#description').val(data.description),
             $('#qtyOnHand').val(data.qtyOnHand),
             $('#unitPrice').val(data.unitPrice)
        }
    })
}

const UpdateRecode=()=>{
    if(itemId){
    const firestore = firebase.firestore();
    firestore
    .collection('items')
    .doc(itemId)
    .update({
        description: $('#description').val(),
        qtyOnHand: $('#qtyOnHand').val(),
        unitPrice: $('#unitPrice').val(), 
    }).then(()=>{
        itemId=undefined;
        loadItems();
    })
  }
}

const deleteData=(id)=>{
    if(confirm('Are you sure?')){
       const firestore = firebase.firestore();
       firestore
        .collection('items')
        .doc(id)
        .delete()
        .then(()=>{
            toastr.success('Deleted!', 'Success!')
            itemId=undefined;
            loadItems()
           
        }) 
    }
}
