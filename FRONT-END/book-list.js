const setEditModal = (isbn) => {
    // implement
}

const deleteBook = (isbn) => {
    // implement
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/books",false)
    xhttp.send();
    const books = JSON.parse(xhttp.responseText);

    for(let book of books){
        const x = `
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 test-muted">${book.isbn}</h6>
                <div>Author: ${book.author}</div>
                <div>Publisher: ${book.publisher}</div>
                <div>Numb of pages: ${book.numOfPages}</div>
                <hr>
                <button type="button" class="btn btn-danger">DELETE</button>
                <button types="button" class="btn btn-primary" data-toggle="modal"           data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                    EDIT
                </button>
                </div>
            </div>
        </div>
        `
        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}
loadBooks();
