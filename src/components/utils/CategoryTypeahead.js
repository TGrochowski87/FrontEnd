import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';

import { FormControl } from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';

const CategoryTypeahead = ({ onChange, selected }) => {
  const [categoryPlaceholder, setCategoryPlaceholder] = useState(
    'Loading categories'
  );

  const { loading, error, data: categoryOptions } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category/expense`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
      cachePolicy: 'no-cache',
    },
    []
  );

  useEffect(() => {
    if (error) setCategoryPlaceholder('Error occured');
    else if (loading) setCategoryPlaceholder('Loading categories...');
    else setCategoryPlaceholder('Start typing category name here');
  }, [error, loading]);

  return (
    <Typeahead
      disabled={error || loading}
      as={FormControl}
      id='inputCategory'
      labelKey='name'
      onChange={(selected) => onChange(selected)}
      options={categoryOptions || []}
      placeholder={categoryPlaceholder}
      selected={selected}
    />
  );
};

export default CategoryTypeahead;
