import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {onCloseDeleteWarningDialog} from "../../../helpers/ComponentHelper";

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
    }
  }

  const getItems = async (url) => {
    try {
      const response = await axiosPrivate.get(url);
      setIsLoading(false);
      setFetchError(null);
      return response;
    } catch (err) {
      setFetchError(err.message);
      return err.message;
    }
  }

  // useEffect((dataUrl) => {
  //     let isMounted = true;
  //     const controller = new AbortController();
  //     const getItems = async (url) => {
  //       try {
  //         const response = await axiosPrivate.get(url, {
  //           signal: controller.signal
  //         });
  //         setIsLoading(false);
  //         setFetchError(null);
  //         isMounted && setData(response.data);
  //       } catch (err) {
  //         setFetchError(err.message);
  //         setData([]);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //
  //     getItems(dataUrl);
  //
  //     return () => {
  //       isMounted = false;
  //       controller.abort();
  //     }
  // }, [dataUrl]);

  return { data, isLoading, fetchError, createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId };

};

export default useCrud;
