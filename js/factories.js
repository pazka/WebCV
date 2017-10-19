angular.module('factories',[])
.factory('CvService',function(){ // c'est l� que nous auront besoin du service http
function getCV(){
  return $.get("./json/cv_weisser.json").then(function(res){

    //associating correct colors
    $.each($(res)[0].allSkills.items,function( skill ) {
      res.allSkills.items[skill].color = res.allSkills.classes[res.allSkills.items[skill].class].color;
    });

    //sorting by classes all the skills used in the corresonding training
    function sortByClass(a,b){
      //  console.log(a+" vs "+b);
      if(res.allSkills.items[a].class > res.allSkills.items[b].class){
        return 1;
      }
      else if(res.allSkills.items[a].class < res.allSkills.items[b].class){
        return -1;
      }
      else {
        return 0;
      }
    };

    res.allTrainings.forEach(function(train) {
      train.skills.sort(sortByClass);
    });

    res.allExps.forEach(function(exp) {
      exp.skills.sort(sortByClass);
    });

    res.allProjects.forEach(function(proj) {
      proj.skills.sort(sortByClass);
    });

    //sorting skills by familiarity
    function sortByFam(a,b){
      //  console.log(a+" vs "+b);
      if(res.allSkills.items[a].familiarity < res.allSkills.items[b].familiarity){
        return 1;
      }
      else if(res.allSkills.items[a].familiarity > res.allSkills.items[b].familiarity){
        return -1;
      }
      else {
        return 0;
      }
    };

    var listItemsSorted = Object.getOwnPropertyNames( res.allSkills.items).sort(sortByFam);
    var itemsSorted = {};
    listItemsSorted.forEach(function(itemName){
      itemsSorted[itemName] = res.allSkills.items[itemName];
    });

    res.allSkills.items = itemsSorted;


    //sorting by classes all the skills used in the corresonding training
    function sortByComplexity(a,b){
      //  console.log(a+" vs "+b);
      if(a.complexity < b.complexity){
        return 1;
      }
      else if(a.complexity > b.complexity){
        return -1;
      }
      else {
        return 0;
      }
    };

    res.allProjects.sort(sortByComplexity);
    return res;
  });
}

return {
  getCV : getCV
};
});
