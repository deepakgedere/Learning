$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/admin/company/getall' },
        order: [[0, 'asc']],
        "columns": [
            {
                render: function (data, type, full, meta) {
                    return meta.row + 1;
                },
                'width' : "2%"
            },
            { data: 'name', 'width': "15%" },
            { data: 'streetAddress', 'width': "15%" },
            { data: 'city', 'width': "10%" },         
            { data: 'state', 'width': "2%" },
            { data: 'postalCode', 'width': "5%" },
            { data: 'phoneNumber', 'width': "5%" },

            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-75 btn-group" role="group">
                        <a href="/admin/company/upsert?id=${data}" class="btn btn-primary mx-2"><i class="bi bi-pencil-square"></i>Edit</a>
                        <a onClick=Delete('/admin/company/delete/${data}') class="btn btn-danger mx-2"><i class="bi bi-trash-fill"></i>Delete</a>
                    </div>`
                },
                "width": "25%"
            }

        ]
    });
}

function Delete (url)
{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    dataTable.ajax.reload();
                    toastr.success(data.message);
                }
            })
            
        }
    });
}