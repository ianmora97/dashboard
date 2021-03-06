
function generalAdminEvent(event){
    notificationsDropDown();
}
function searchonfind() {
    let table = $('#table').DataTable();
    let val = $('#barSearch').val();
    let result = table.search(val).draw();
}
function notificationsDropDown() {
    $('#dropdownNotifications').on('click',function(){
        $('#notificationsPanel').toggle();
    })
}

function buildtable() {
    return new Promise((resolve, reject) => {
        $('#divTable').html('');
        $('#divTable').append(`
        <table class="table table-borderless text-center" id="table" data-order="[[ 1, &quot;asc&quot; ]]">
            <thead class="table-light-header">
                <tr style="max-height: 40px;" id="tableHeader"></tr>
            </thead>
            <tbody id="tableBody">
                
            </tbody>
        </table>
        `);
        resolve('table_created');
    })
}
function buildHeaders(data) {
    return new Promise((resolve, reject) => {
        $('#tableHeader').append(`<th scope="col">#</th>`);
        data.forEach(e => {
            $('#tableHeader').append(`
                <th scope="col">${showHeader(e.name)}</th>
            `);
        })
        $('#tableHeader').append(`<th scope="col">Edit</th>`);
        resolve('headers_created');
    })
}
async function buildRows(data) {
    return new Promise((resolve, reject) => {
        data.forEach(e => {
            printRow(e);
        });
      resolve('rows_created');
    })
}
function printRow(data) {
    return new Promise((resolve, reject) => {
        let size = (Object.keys(data).length) - 1;
        let id = data.id;
        let push = '';
        push += `<tr class="align-middle">`;
        Object.entries(data).forEach(([key, value],index) => {
            if(index == 0){
                push += `
                <td class="d-flex justify-content-center">
                    <div class="form-check">
                        <label class="form-check-label" for="checkbox-${id}"></label>
                        <input class="form-check-input" type="checkbox" id="checkbox-${id}" value="${id}" name="checked[]"/>
                    </div>
                </td>
                `;
                push += `<td>${value}</td>`;
            }
            else if(isImage(value)){ 
                push +=`
                <td>
                    <span class="sr-only">${value.split('.')[0] == 'avatar1' ? '1':'2'}</span>
                    <img src="/static/images/profile/${value}" alt="" width="45" height="45" class="rounded-circle me-2">
                </td>
                `;
            }
            else if(isDate(value)){
                push +=`<td>${toDate(value)}</td>`;
            }else{
                push +=`<td>${value}</td>`;
            }
            if(index == size){
                push +=`
                <td class="d-flex justify-content-center">
                    <div role="button" class="w-100 h-100" data-id="${id}" data-bs-toggle="modal" data-bs-target="#updateRow">
                        <i class="far fa-edit text-muted fa-2x"></i>
                    </div>
                </td>
                `;
            }
        });
        push += '</tr>';
        $('#tableBody').append(push);
        resolve('row_created');
    })
}
function isDate(data){
    if(typeof data === 'string'){
        let d = data.split('-')
        console.log(d)
        return d.length == 5
    }
    return false
}
function isImage(data) {
    if(typeof data === 'string'){
        return data.match('avatar')
    }
    return false
}
function showHeader(header) {
    switch (header) {
        case 'created_at':
            return 'Registered'
        case 'id':
            return 'ID'
        default:
            return header.charAt(0).toUpperCase() + header.slice(1);
    }
}
function toDate(date) {
    let d = date.split('-');
    let all = new Date();
    all.setDate(d[0])
    all.setMonth(d[1])
    all.setFullYear(d[2])
    all.setHours(d[3])
    all.setMinutes(d[4])
    console.log(all)
    return all.toLocaleDateString();
}
function addtoMap(map,id,e) {
    map.set(id,e)
}
function clearMap(map) {
    map.clear()
}
function resetTable() {
    let table = $("#table").DataTable();
    table.destroy();
}
function buildDataTable(columnsDefs) {
    $('#table').DataTable({
        "language": {
            "decimal":        "",
            "emptyTable":     "No data available in table",
            "info":           "Showing _END_ of _TOTAL_ entries",
            "infoEmpty":      "Showing 0 to 0 of 0 entries",
            "infoFiltered":   "(filtered from _MAX_ total entries)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "_MENU_",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "search":         "Search:",
            "zeroRecords":    "No matching records found",
            "paginate": {
                "first": '<i class="fas fa-angle-double-left"></i>',
                "previous": '<i class="fas fa-angle-left"></i>',
                "next": '<i class="fas fa-angle-right"></i>',
                "last": '<i class="fas fa-angle-double-right"></i>'
            },
            "aria": {
                "paginate": {
                    "first": '<i class="fas fa-angle-double-left"></i>',
                    "previous": '<i class="fas fa-angle-left"></i>',
                    "next": '<i class="fas fa-angle-right"></i>',
                    "last": '<i class="fas fa-angle-double-right"></i>'
                }
            }
        },
        columnDefs: columnsDefs
    });
    $('#info').html('');
    $('#pagination').html('');
    $('#length').html('');

    $('#table_wrapper').addClass('px-0')
    let a = $('#table_wrapper').find('.row')[1];
    $(a).addClass('mx-0')
    $(a).find('.col-sm-12').addClass('g-0');

    $('#table_filter').css('display', 'none');
    $('#table_info').appendTo('#info');
    
    $('#table_paginate').appendTo('#pagination');

    $('#table_length').find('label').find('select').removeClass('form-select-sm')
    $('#table_length').find('label').find('select').appendTo('#length');
    $('#table_length').html('');
}
document.addEventListener("DOMContentLoaded", generalAdminEvent);