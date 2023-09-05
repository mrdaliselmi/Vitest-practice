import React, { useState } from 'react';
import { Input, Tree, Form, Button } from 'antd';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import RichTextEditor from './RichTextEditor';
import StarRating from './StarRating';

const { TreeNode } = Tree;
const { Search } = Input;

const LeftNav = () => {
  const folderData = [
    {
      title: 'E-Book',
      key: 'ebook',
      children: [
        {
          title: 'Fiction',
          key: 'fiction',
          children: [
            { title: 'Book 1', key: 'book1' },
            { title: 'Book 2', key: 'book2' },
            { title: 'Book 3', key: 'book3' },
          ],
        },
        {
          title: 'Horror',
          key: 'horror',
          children: [
            { title: 'Book 4', key: 'book4' },
            { title: 'Book 5', key: 'book5' },
          ],
        },
        // Add more genre folders here
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Expand nodes that match the search term
    const matchingKeys = findMatchingKeys(folderData, value.toLowerCase());
    setExpandedKeys(matchingKeys);
  };

  const handleSelect = (selectedKeys) => {
    const key = selectedKeys[0];
    setSelectedItem(key);

    // Find details of the selected item
    const details = findItemDetails(folderData, key);
    setSelectedItemDetails(details);
  };

  // Recursively find keys of matching nodes
  const findMatchingKeys = (data, query) => {
    let matchingKeys = [];
    data.forEach((item) => {
      if (item.title.toLowerCase().includes(query)) {
        matchingKeys.push(item.key);
      }
      if (item.children) {
        matchingKeys = matchingKeys.concat(findMatchingKeys(item.children, query));
      }
    });
    return matchingKeys;
  };

  // Recursively find details of the selected item
  const findItemDetails = (data, key) => {
    for (const item of data) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const childDetails = findItemDetails(item.children, key);
        if (childDetails) {
          return childDetails;
        }
      }
    }
    return null;
  };

  const isBookSelected = selectedItem && selectedItem.startsWith('book');

  return (
    <div className="left-nav-container">
      <div className="left-nav">
        <h2>Left Navigation</h2>
        <Search
          placeholder="Search (Exact Match)..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Tree
          showIcon
          expandedKeys={expandedKeys}
          onSelect={handleSelect}
          selectedKeys={[selectedItem]}
          onExpand={(keys) => setExpandedKeys(keys)}
        >
          {folderData.map((folder) => (
            <TreeNode
              key={folder.key}
              title={<span>{folder.title}</span>}
              icon={<FolderOutlined />}
            >
              {folder.children.map((subfolder) => (
                <TreeNode
                  key={subfolder.key}
                  title={<span>{subfolder.title}</span>}
                  icon={<FolderOutlined />}
                >
                  {subfolder.children.map((book) => (
                    <TreeNode
                      key={book.key}
                      title={<span>{book.title}</span>}
                      icon={<BookOutlined />}
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      </div>

      {isBookSelected && (
        <div className="edit-form">
          <h3>Edit Book</h3>
          <Form>
            <Form.Item label="Book Title">
              <Input value={selectedItemDetails?.title} />
            </Form.Item>
            <Form.Item>
              {/* Star rating input */}
              <StarRating
                value={selectedItemDetails?.rating || 0} // Pass the rating as value
                onChange={(value) => {
                  // Update the rating in your state or wherever it's stored
                  // For example, you can use setSelectedItemDetails to update it
                  setSelectedItemDetails((prevDetails) => ({
                    ...prevDetails,
                    rating: value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Review">
              {/* Use the RichTextEditor component */}
              <RichTextEditor
                value={selectedItemDetails?.review || ''} // Pass the review content as value
                onChange={(value) => {
                  // Update the review content in your state or wherever it's stored
                  // For example, you can use setSelectedItemDetails to update it
                  setSelectedItemDetails((prevDetails) => ({
                    ...prevDetails,
                    review: value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Save</Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LeftNav;
