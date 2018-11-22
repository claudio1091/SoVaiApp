package com.claudio.sovai;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import com.google.firebase.database.FirebaseDatabase;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseMessagingPackage(),
            new BlurViewPackage(),
            new PhotoViewPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
