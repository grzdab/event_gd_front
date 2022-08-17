import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "./useAxiosPrivate";
import {onCloseDeleteWarningDialog} from "../helpers/ComponentHelper";

const useCrud = (dataUrl) => {

  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const createItem = async (url, item, state) => {
    const itemsList = state.itemsList;
    const setItems = state.setItems;

    const response = await axiosPrivate.post(url, item);
    setItems([...itemsList, response.data]);
    return response.status;
  }

  const updateItem = async (url, item, state) => {
    const itemsList = state.itemsList;
    const setItems = state.setItems;

    const response = await axiosPrivate.put(url, item);
    const data = await response.data;
    setItems(
      itemsList.map((i) =>
        i.id === item.id ? data : i));
    return response;
  }

  const deleteItem = async (url, currentItemId, state) => {
    const itemsList = state.itemsList;
    const setItems = state.setItems;
    const response = await axiosPrivate.delete(url);
    if (response.status === 200) {
      setItems(itemsList.filter((i) => i.id !== currentItemId));
      onCloseDeleteWarningDialog({state});
    }
    return response.status;
  }

  const getRelatedChildrenByParentId = async (url, id, setRelatedItems) => {
    const setItems = setRelatedItems;

    try {
      const response = await axiosPrivate.get(url);
      setItems(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      // TODO returns empty array only for testing where there are no endpoints for related items
      return [];

    }
  }

  const getItems = async (url) => {
    let response;
    try {
      response = await axiosPrivate.get(url);
      setFetchError(null);
      return response;
    } catch (err) {
      setFetchError(err.message);
      return err.message;
    } finally {
      setIsLoading(false);
    }
  }

  return { createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId };

};

export default useCrud;
