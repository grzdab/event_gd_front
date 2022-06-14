export const delay = (time) => {
    return new Promise(r => setTimeout(r, time));
}

export const addItem = async (item, url, setItems, itemsList) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(item)
    });
    const data = await response.json();
    setItems([...itemsList, data]);
}

export const updateItem = async (item, currentItem, url, setItems, itemsList) => {
    const updated = {
        name: currentItem.name,
        description: currentItem.description
    };
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(updated)
    });
    const data = await response.json();
    setItems(
        itemsList.map((i) =>
            i.id === item.id ? data : i));
}

export const deleteItem = async (id, url, setItems, itemsList) => {
    await fetch(url, {method: 'DELETE',});
    setItems(itemsList.filter((i) => i.id !== id));
}