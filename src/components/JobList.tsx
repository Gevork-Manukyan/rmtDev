import { useActiveIdContext } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeJobItemId } = useActiveIdContext();

  return <ul className="job-list">
    {isLoading ? <Spinner /> : null}
    {!isLoading &&
      jobItems.map((jobItem) => <JobListItem key={jobItem.id} jobItem={jobItem} isActive={jobItem.id === activeJobItemId} />)
    }
  </ul>;
}

export default JobList;
