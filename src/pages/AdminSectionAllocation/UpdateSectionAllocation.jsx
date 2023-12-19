import React from 'react'

const UpdateSectionAllocation = () => {
  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New SectionAllocation
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Performance' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
                  performance_id: e.target.value,
                })
              }
            >
              <option>Choose a Performance</option>
              {performancelist?.map((performance, index) => (
                <option key={index} value={performance.id}>
                  {performance.show_name}
                </option>
              ))}
            </select>
          ) : item.title == 'Section' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
                  section_id: e.target.value,
                })
              }
            >
              <option>Choose a Section</option>
              {sectionlist?.map((section, index) => (
                <option key={index} value={section.section_id}>
                  {section.section_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
                  [item.method]: e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertSectionAllocation}
        >
          Save
        </button>
        <button
          onClick={handleDiscard}
          className="bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default UpdateSectionAllocation
