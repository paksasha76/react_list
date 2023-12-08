import React, { FC } from "react";
import MySelect from "../UI/select/MySelect";
import { MyInput } from "../UI/input/MyInput";

interface Props {
  filter: { sort: string; query: string };
  setFilter: (filter: { sort: string; query: string }) => void;
}

const PostFilter: FC<Props> = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        placeholder="Поиск"
        value={filter.query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter({ ...filter, query: e.target.value })
        }
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort: string) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue={"Сортировка"}
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
