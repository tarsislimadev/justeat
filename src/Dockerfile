FROM tmvdl/android:app

WORKDIR /app

RUN cordova create justeat com.brtmvdl.justeat justeat

WORKDIR /app/justeat

COPY www/html www

RUN cordova platform add android

RUN cordova build android
