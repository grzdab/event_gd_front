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
    return response;
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

    try {
      await axiosPrivate.delete();
      setItems(itemsList.filter((i) => i.id !== currentItemId));
      onCloseDeleteWarningDialog({ state });
    } catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getItems = async (url) => {
        try {
          const response = await axiosPrivate.get(url, {
            signal: controller.signal
          });
          isMounted && setData(response.data);
          setIsLoading(false);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
          setData([]);
        } finally {
          setIsLoading(false);
        }
      }

      getItems(dataUrl);

      return () => {
        isMounted = false;
        controller.abort();
      }
  }, [dataUrl]);

  return { data, isLoading, fetchError, createItem, updateItem };

};

export default useCrud;
