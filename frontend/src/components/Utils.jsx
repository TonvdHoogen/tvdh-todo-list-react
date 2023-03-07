
     function compare(a, b) {
        if (a.rubric < b.rubric) {
            return -1;
        } else {
            return 1;
        }
      };
      
      function compareTodoes(a, b) {
        if (a.priority < b.priority) {
            return -1;
        } else {
            return 1;
        }
      }

export {compare, compareTodoes};