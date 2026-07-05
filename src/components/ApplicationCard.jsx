const STATUS_STYLES = {
  Applied: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500', border: 'border-l-indigo-500' },
  'OA/Test': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', border: 'border-l-purple-500' },
  Interview: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', border: 'border-l-yellow-500' },
  Offer: { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500', border: 'border-l-teal-500' },
  Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-l-red-500' },
};

export default function ApplicationCard({ application, onEdit, onDelete }) {
  const style = STATUS_STYLES[application.status] || {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
    border: 'border-l-gray-400',
  };

  return (
    <div
      className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 ${style.border} hover:shadow-md transition`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h4 className="font-semibold text-lg text-gray-900">
              {application.companyName}
            </h4>
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${style.bg} ${style.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {application.status}
            </span>
          </div>

          <p className="text-gray-700 text-sm font-medium">{application.role}</p>

          <div className="flex items-center gap-3 text-gray-400 text-xs mt-2">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {application.dateApplied}
            </span>
            <span>•</span>
            <span>via {application.source}</span>
          </div>

          {application.jobLink && (
            
              <a 
              href={application.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-600 text-xs hover:underline mt-2 font-medium"
            >
              View Job Posting
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}

          {application.notes && (
            <p className="text-gray-500 text-sm mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {application.notes}
            </p>
          )}
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onEdit(application)}
            className="text-indigo-600 text-sm font-medium hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="text-red-500 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}