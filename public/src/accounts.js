//returns the account object that has the matching ID.
function findAccountById(accounts, id) {
 const found = accounts.find(account => account.id == id )
 return found;
}


//returns an array of provided account objects sorted alphabetically by last name.
function sortAccountsByLastName(accounts) {
  //'sort' mutates the array; do we want to mutate 'accounts' array or do we want to make a copy????
  let sorted = accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
  return sorted;
}


// function that returns a _number_ representing the number of times the account's ID appears in any book's `borrows` array. 
function getTotalNumberOfBorrows(account, books) {
  // create a variable for the id in account using destructuring
    const {
        id: accountId
    } = account;
  // use the reduce method on books, to accumulate total bumber of borrows.
    return books.reduce((accumulator, book) => {
  // callback function
      return (
            accumulator +
            book.borrows
  // use filter method to create a new array that only includes borrows that have the same id as the account id 
            .filter(borrow => borrow.id === accountId)
  // use the reduce method to add 1 for each item in the filtered array?
            .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
        );
    }, 0);
}


/*
The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:
- An account object.
- An array of all book objects.
- An array of all author objects.
It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. 
_Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
*/
function getBooksPossessedByAccount(account, books, authors) {
  const inPossesion = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        // if iteration 'author' id === 'book' (.map() iteration) authorId, then add "author" key and equate it to iteration 'author'.
        if (author.id === book.authorId) book["author"] = author;
      });
      // if iteration is NOT returned && iteration id === account.id, then push (add) 'book' iteration to 'inPossession' (with "author" key added, from above)
      if (borrow.returned === false && borrow.id === account.id) {
        inPossesion.push(book);
      }
    });
  });
  return inPossesion;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
