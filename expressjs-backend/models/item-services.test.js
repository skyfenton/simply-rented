const myFunctions = require("./item-services");

const testItem = {
  itemName: "jest item",
  itemRate: 10,
  itemDescription: "Test Item",
  availability: "testingJesting",
  rating: 5,
  owner: "jest owner",
  renter: "jest renter",
};

const editedItem = {
  itemName: "jest item",
  itemRate: 15,
  itemDescription: "Test Item Update",
  availability: "testingJesting",
  rating: 5,
  owner: "jest owner",
  renter: "jest renter",
};

const failItem = {};

test("Testing Add Item -- Success", async () => {
  const result = await myFunctions.addItem(testItem);
  const target = testItem;
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Add Item -- Failure", async () => {
  const result = await myFunctions.addItem(failItem);
  expect(result).toBeFalsy();
});

test("Testing Find Item by Name -- Success", async () => {
  const result_list = await myFunctions.findItemByName("jest item");
  const target = testItem;
  const result = result_list[0];
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Check Item", async () => {
  const result = await myFunctions.checkItem("jest item");
  expect(result).toBeTruthy();
});

test("Testing Parse Items", async () => {
  const items = await myFunctions.getItems();
  const result_list = await myFunctions.parseItems(items, "jest");
  const result = result_list[0];
  const target = testItem;
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing find Items by Owner", async () => {
  const result_list = await myFunctions.findItemsByOwner("jest owner");
  const target = testItem;
  const result = result_list[0];
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing find Items by Renter", async () => {
  const result_list = await myFunctions.findItemsByRenter("jest renter");
  const target = testItem;
  const result = result_list[0];
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Get Items -- General", async () => {
  const result = await myFunctions.getItems();
  expect(result).toBeTruthy;
});

test("Testing Get Items -- Specific", async () => {
  const result_list = await myFunctions.getItems("jest item");
  const target = testItem;
  const result = result_list[0];
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing find Item by ID -- Success", async () => {
  const item_list = await myFunctions.findItemByName("jest item");
  const target = testItem;
  const item = item_list[0];
  const id = item.id;
  const result = await myFunctions.findItemById(id);
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing find Item by ID -- Failure", async () => {
  const result = await myFunctions.findItemById();
  console.log(result);
  expect(result).toBeFalsy();
});

test("Testing Update Item by ID", async () => {
  const item_list = await myFunctions.findItemByName("jest item");
  const target = testItem;
  const item = item_list[0];
  const id = { _id: item.id };
  const result = await myFunctions.updateItemById(id, {
    itemName: "jest item",
    itemRate: 15,
    itemDescription: "Test Item Update",
    availability: "testingJesting",
    rating: 5,
    owner: "jest owner",
    renter: "jest renter",
    image: "https://townsquare.media/site/13/files/2014/06/Push-mower.jpg",
  });
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
  const item_list_updated = await myFunctions.findItemByName("jest item");
  const result_updated = item_list_updated[0];
  const target_updated = editedItem;
  expect(result_updated.itemName).toBe(target_updated.itemName);
  expect(result_updated.itemRate).toBe(target_updated.itemRate);
  expect(result_updated.itemDescription).toBe(target_updated.itemDescription);
  expect(result_updated.availability).toBe(target_updated.availability);
  expect(result_updated.rating).toBe(target_updated.rating);
  expect(result_updated.owner).toBe(target_updated.owner);
  expect(result_updated.renter).toBe(target_updated.renter);
});

test("Testing Find Item by ID and Delete -- Success", async () => {
  const item = await myFunctions.findItemByName("jest item");
  const id = item[0].id;
  const result = await myFunctions.findItemByIDAndDelete(id);
  const target = editedItem;
  expect(result.itemName).toBe(target.itemName);
  expect(result.itemRate).toBe(target.itemRate);
  expect(result.itemDescription).toBe(target.itemDescription);
  expect(result.availability).toBe(target.availability);
  expect(result.rating).toBe(target.rating);
  expect(result.owner).toBe(target.owner);
  expect(result.renter).toBe(target.renter);
});

test("Testing Find Item by ID and Delete -- Failure", async () => {
  const result = await myFunctions.findItemByIDAndDelete();
  expect(result).toBeFalsy();
});
