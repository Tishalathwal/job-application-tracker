const STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-800',
  'OA/Test': 'bg-purple-100 text-purple-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function ApplicationCard({ application, onEdit, onDelete }) {
  return (
    <>
    <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-lg">{application.companyName}</h4>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              STATUS_COLORS[application.status] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {application.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{application.role}</p>
        <p className="text-gray-400 text-xs mt-1">
          Applied on {application.dateApplied} • via {application.source}
        </p>
       {application.jobLink && (
        <a
        href={application.jobLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-xs hover:underline"
        >
        View Job Posting
        </a>
        )}
        {application.notes && (
          <p className="text-gray-500 text-sm mt-2">{application.notes}</p>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(application)}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(application.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
    </>
  );
}