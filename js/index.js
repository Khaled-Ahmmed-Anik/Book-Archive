const hideField = id =>{
    document.getElementById(id).style.visibility = "hidden";
}

const showField = id =>{
    document.getElementById(id).style.visibility = "visible";
}


// load data from input value
const loadData = inputedValue => {
    fetch(`https://openlibrary.org/search.json?q=${inputedValue}`)
    .then(response => response.json())
    .then(data => processData(data))
}


//check if particular key is exist of not in book object
const keyCheck = (book, key) =>{
    if(key in book){
        return book[key][0];
    }else {
        return 'not found'
    }
}

// data prosessing after fetch
const processData = data =>{

    if(data.numFound!==0){
        document.getElementById('total-result').innerText=`${data.numFound} results found`;
    }else {
        document.getElementById('total-result').innerText=`no result found`;
    }
    
    hideField('spinner');
    showField('total-result');

    if(data.numFound===0)return;

    const books=data.docs;
    const booksContainer=document.getElementById('books-container');

    books.forEach(book => {

        const title=book.title;
        const author=keyCheck(book, 'author_name');
        const publish=keyCheck(book, 'publish_date');
        const publisher=keyCheck(book, 'publisher');

        const coverId=book.cover_i;

        const div=document.createElement('div');
        div.classList.add("col");
        div.innerHTML=`
        <div class="card h-100">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Book Name</td>
                                    <td>: ${title}</td>
                                </tr>
                                <tr>
                                    <td>author</td>
                                    <td>: ${author}</td>
                                </tr>
                                <tr>
                                    <td>First Publish</td>
                                    <td>: ${publish}</td>
                                </tr>
                                <tr>
                                    <td>Publiaher</td>
                                    <td>: ${publisher}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    });

}



//search button clicked
document.getElementById('search-btn').addEventListener('click',function(){
    // remove previous books
    document.getElementById('books-container').textContent='';

    hideField('total-result');
    showField('spinner');
    
    const inputField=document.getElementById('input-field');
    const inputedValue=inputField.value;
    inputField.value='';
    loadData(inputedValue);
})