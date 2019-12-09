const serviceRequest = ({
   id,
   created,
   author,
   type,
   photo,
   description,
   dueDate,
   status,
   tracking,
   expectedArrival,
}) => {
   return {
      id: id || 'some_uuid',
      created: created || new Date(),
      author: author || 'ManageLife Customer',
      type: type || 'purchase',
      photo: photo || 'someFile.jpg',
      description: description || 'I need more soap for my dishes',
      dueDate: dueDate || new Date(), // parse date and time from this? or separate fields?
      status: status || 'in_progress',
      tracking: tracking || [{}, {}],
      expectedArrival: expectedArrival || new Date(),
   }
}
const problemReport = ({
   id,
   created,
   author,
   description,
   bestTime,
   photo,
   status,
   serviceHistory,
   expectedFinish,
}) => {
   return {
      id: id || 'report_' + 'some_uuid',
      created: created || new Date(),
      author: author || 'ManageLife Customer',
      description:
         description ||
         `I was watching TV and the screen went black. I can't get it to turn on.`,
      bestTime: bestTime || new Date(),
      photo: photo || 'someFile.jpg',
      status: status || 'in_progress',
      serviceHistory: serviceHistory || [{}, {}],
      expectedFinish: expectedFinish || new Date(),
   }
}

export { serviceRequest, problemReport }
