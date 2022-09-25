# Finishing things off

Now that you know React, I have an exercise for you! And it involves an entire fake API.

```js
// Returns a promise to an array of objects, where the promise may be rejected.
getRecords()

// Returns a promise that resolves to the added record (including an `id`
// property), or is rejected if the updates fails.
createRecord(data)

// Returns a promise that resolves to the updated record, or is rejected if
// the update fails.
patchRecord(id, data)

// Returns a promise that resolves when the delete is complete, or
// is rejected if the delete fails.
deleteRecord(id)
```

**Your tasks are to:**

- **Add "edit" and "delete" buttons to the contact list.**
- **Connect "edit", "delete" and "save" up with the fake API.**

By this point, you've learned everything you need to do this like a pro. Good luck!