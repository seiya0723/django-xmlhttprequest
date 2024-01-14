from django.shortcuts import render
from django.views import View

from django.http.response import JsonResponse
from django.template.loader import render_to_string

from .models import Topic
from .forms import TopicForm

class IndexView(View):

    def get(self, request, *args, **kwargs):

        context             = {}
        context["topics"]   = Topic.objects.all()

        return render(request,"bbs/index.html",context)

    def post(self, request, *args, **kwargs):
        data    = { "error":True }
        context = {}
        
        form    = TopicForm(request.POST)

        if not form.is_valid():
            print("Validation Error")
            print(form.errors)
            return JsonResponse(json)

        form.save()
        data["error"]   = False

        context["topics"]   = Topic.objects.all()
        data["content"]     = render_to_string("bbs/content.html",context,request)

        return JsonResponse(data)

index   = IndexView.as_view()



