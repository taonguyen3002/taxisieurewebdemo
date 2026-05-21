import { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

// Define the prop types for the component
interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Handle key events for adding tags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      const newTag = inputValue.trim();
      if (newTag.length > 40) {
        alert("Tag quá dài. Vui lòng nhập tag dưới 40 ký tự.");
        return;
      }

      // Giới hạn số lượng tags bằng cách kiểm tra độ dài mảng tags:

      if (tags.length >= 30) {
        alert("Chỉ cho phép tối đa 30 tags.");
        return;
      }
      e.preventDefault();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  // Remove a tag from the list
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            deleteIcon={<Close />}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
      <TextField
        variant="outlined"
        label="Nhập tag và nhấn Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
      />
    </Box>
  );
};

export default TagInput;
